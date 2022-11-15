# SQL bindings guestbook demo

## Components
- Azure SQL Database
- .NET Azure Functions
  - SQL trigger
  - SQL output binding
- JavaScript Azure Functions
  - SQL output binding
  - SQL input binding
- Azure Static Web App
 

## What are SQL bindings?

![summary slide on SQL bindings](images/sqlbindings-summary.png)

Learn more at [https://aka.ms/sqlbindings](https://aka.ms/sqlbindings).
 
## Architecture

![architecture diagram](images/architecture.png)

### Guestbook web app

### Guestbook moderator
- .NET Azure Function
  - SQL trigger on changes in app.Entry table
  - sends newly inserted rows to Azure Content Moderation
  - SQL output binding writes moderation results to app.Moderation table
  - SQL output binding updates to app.Entry table
- JavaScript Azure Functions
  - lists some entries from the app.Entry table (SQL input binding)
  - add guestbook entry for to app.Entry table (SQL output binding)