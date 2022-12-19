# Forge Hello World

This project contains a Forge app that adds Jira project permission.

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

output example

Columns: 'Project', 'Users', 'DEVS', 'DES', 'Bugs'

```bash
╔══════════════════════════════════════════════════════════════════╗
║                       NAUTES METRICA-JIRA                        ║
║               This is the table about our projects               ║
╟──────────────────────────────────────────────────────────────────╢
║      1  AC Milan                       8       3       1       9 ║
║      2  AIM                           10       5       2       1 ║
║      3  Bevolver                       3       1       0       0 ║
║      4  Cariaggi                       6       3       0       0 ║
║      5  Confindustria Brescia          8       4       2      58 ║
║      6  Control1st                     5       1       0       0 ║
║      7  Erga Tourism                   7       1       3       0 ║
║      8  Federlegno Arredo              4       1       0       0 ║
║      9  GeFi                          16       9       1      82 ║
║     10  Olimpiadi                      7       2       2       0 ║
║     11  Poetronicart                   5       1       1       3 ║
║     12  Poliform                       7       2       2       0 ║
║     13  Santoni                        2       0       1       0 ║
║     14  Schnell                        4       2       0       0 ║
║     15  Salone del Mobile              4       1       0       3 ║
║     16  Tecnoindagini                 12       9       1       0 ║
║     17  Test Issue Sync                1       0       0      23 ║
║     18  Starter Template v1           48      21       9       0 ║
║     19  Tecnoconference                4       3       1       0 ║
 ══════════════════════════════════════════════════════════════════
```

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app by editing the `manifest.yml` file.

- Build and deploy your app by running:

```
forge deploy
```

- Install your app in an Atlassian site by running:

```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:

```
forge tunnel
```

- Trigger your app by running:

```
https://40a30289-daf1-4b56-88ed-309116b278b7.hello.atlassian-dev.net/x1/Xwxl7d99YyIHYWDHnYMuXIYn6hs
```

### Notes

- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.
