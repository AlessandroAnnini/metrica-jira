import api, { route, webTrigger } from '@forge/api';

const getDataFromJira = async (url, resultProp, bodyObj, startAt = 0) => {
  // make the first request with startAt = 0
  // calculate nextStartAt as startAt + maxResults
  // if total > nextStartAt
  //   make a request using nextStartAt as startAt
  //   return an array of old data and new data
  // else
  //   return data

  let response;

  try {
    if (!bodyObj) {
      response = await api.asApp().requestJira(url);
    } else {
      const completeBody = { ...bodyObj, startAt, maxResults: 100 };
      const body = JSON.stringify(completeBody);

      response = await api.asApp().requestJira(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });
    }
  } catch (error) {
    console.error('getDataFromJira error: ', error);
    throw error;
  }

  const result = await response.json();

  if (!resultProp) {
    return result;
  }

  const { total, maxResults } = result;
  const data = result[resultProp];
  const nextStartAt = startAt + maxResults;

  if (total <= nextStartAt) {
    return data;
  }

  const nextData = await getDataFromJira(url, resultProp, bodyObj, nextStartAt);
  return [...data, ...nextData];
};

//
//
//

export const getProjects = () =>
  getDataFromJira(route`/rest/api/3/project/search`, 'values');

export const getUsersForProject = async (projectKey) =>
  getDataFromJira(
    route`/rest/api/3/user/assignable/multiProjectSearch?query=&projectKeys=${projectKey}`
  );

export const getBugsForProject = async (projectKey) => {
  const data = await getDataFromJira(route`/rest/api/3/search`, 'issues', {
    jql: `project = ${projectKey}`,
    fields: ['issuetype', 'customfield_10016'],
  });

  const bugs = data.filter((d) => d.fields.issuetype.name === 'Bug');
  return bugs.length;
};

export const getUserGroup = async (accountId) =>
  getDataFromJira(route`/rest/api/3/user/groups?accountId=${accountId}`);
