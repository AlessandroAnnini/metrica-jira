import { table } from 'table';

import {
  getBugsForProject,
  getProjects,
  getUserGroup,
  getUsersForProject,
} from './jira-utils.js';

const tableConfig = {
  columns: [
    { alignment: 'right', width: 6 },
    { alignment: 'left', width: 24 },
    { alignment: 'right', width: 6 },
    { alignment: 'right', width: 6 },
    { alignment: 'right', width: 6 },
    { alignment: 'right', width: 6 },
  ],
  // singleLine: true,
  header: {
    alignment: 'center',
    content: 'NAUTES METRICA-JIRA\nThis is the table about our projects',
  },
  drawHorizontalLine: (lineIndex, rowCount) => {
    return lineIndex === 0 || lineIndex === 1;
  },
  drawVerticalLine: (lineIndex, columnCount) => {
    return lineIndex === 0 || lineIndex === columnCount;
  },
};

exports.main = async () => {
  const projects = await api.asApp().requestJira('/rest/api/3/project');
  console.log(projects);
  return projects;
};

exports.runWebTrigger = async () => {
  // const triggerUrl = await webTrigger.getUrl('main-web-trigger-key');
  // https://40a30289-daf1-4b56-88ed-309116b278b7.hello.atlassian-dev.net/x1/Xwxl7d99YyIHYWDHnYMuXIYn6hs

  const projects = await getProjects();

  const tableData = []; // ['-', 'Project', 'Users', 'DEVS', 'DES', 'Bugs'];
  const allUsers = {};
  let count = 0;
  for (const project of projects) {
    const { key, name } = project;
    const users = await getUsersForProject(key);

    const usersProj = [];
    for (const user of users) {
      const { accountId } = user;
      if (!allUsers[accountId]) {
        const groups = await getUserGroup(accountId);
        const groupsNames = groups.map((g) => g.name);
        const nextUser = { ...user, groups: groupsNames };
        allUsers[accountId] = nextUser;
        usersProj.push(nextUser);
      } else {
        const nextUser = allUsers[accountId];
        usersProj.push(nextUser);
      }
    }

    const bugs = await getBugsForProject(key);
    count++;

    const devs = usersProj.filter((u) => u.groups.includes('developers'));
    const des = usersProj.filter((u) => u.groups.includes('project-design'));

    tableData.push([
      count,
      name,
      usersProj.length,
      devs.length,
      des.length,
      bugs,
    ]);

    console.log('\n', table(tableData, tableConfig));
  }
};
