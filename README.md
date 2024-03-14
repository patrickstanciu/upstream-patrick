# Upstream Sync

Welcome to Upstream Sync! This is a fictitious backend project that serves as a platform for peer-programming or assignment evaluation. Please read the following instructions carefully to get started and complete the assignment section at the end of this document.

## Overview

Upstream Sync is designed to exploit an email retrieval API. Its main function is to convert the fetched emails into messages that can be utilized within an application. Key features include:

- Matching email addresses with user accounts.
- Automatically creating messages and threads based on the emails.

The aim is to simulate real-world scenarios and provide a foundation for insightful technical discussions, fostering a deeper understanding of the codebase and its challenges.

## Getting Started

1. **Clone the Repository and install the dependencies**  
   Begin by cloning this repository to your local machine.
   Run `yarn install` to install all the dependencies.

2. **Review the Project Description**  
   Make sure to go through the project's description available in this README to get an understanding of what Upstream Sync aims to achieve.

3. **Familiarize Yourself with the Codebase**  
   Take a moment to briefly go through the codebase before starting the assignment. This will help you in navigating the code and understanding its structure.

4. **Install Recommended Extensions**  
   It's advised to install the two recommended extensions: Prettier and SQLite Explorer. Their unique identifiers can be found in the `extensions.json` located in the `.vscode` folder of this project.

5. **Optional: Install DB Browser for SQLite**  
   This is an optional step, this tool would help you to view the database in a GUI. You can download it from [here](https://sqlitebrowser.org/dl/). Otherwise, you can use the SQLite Explorer extension to view the database.

6. **Run the Project**  
   Run `yarn start` to start the project. This will initialize the database, insert test data and run the `EmailImportService` to fetch emails from the API and insert them into the database. It will also display the messages and threads stored in the database.

7. Complete the Assignment Section
   Follow the instructions in the assignment section of this document to complete the assignment.

## Project Description

**Upstream Sync** is a backend application that taps into a fictional API to retrieve emails. These emails are then transformed into messages and inserted into an SQLite database, with threads being automatically created from the emails.

### Entry Point: `index.ts`

- `initializeProviders`: This method loads all necessary dependencies, including services and repositories. Some of these may have inter-dependencies.

- `resetDatabaseSchemaAndData`: Invoked via the `databaseSchemaService`, this method resets the SQLite database stored locally by deleting and recreating the tables with test data.

- `EmailImportService`: The `import` method is called to fetch emails from a fictional API, transform them into messages and threads, and then insert them into the SQLite database.

- `MessageDisplayService`: Primarily for debugging purposes, the `DisplayMessages` method displays a list of inserted threads and messages with details like the date and sender.

### Project Architecture

- **Datastore**

  - **Repositories**: A commonly used pattern to separate application logic from data access. These classes manage interactions with the database.
  - **Schema**: Contains interfaces that define the database schema for the entities Email, Message, Thread, and User.

- **Models**

  - **Entities**: Represent business model entities like Email, Message, Thread, and User. The Email entity represents the email as it is fetched from the API. The Message entity represents the message that is created from the email. A thread is a collection of messages. The User entity represents a user of the application.
  - **ValueObjects**: Objects that have no identity of their own and are immutable.

- **Services**
  - **EmailFetcherService**: Responsible for fetching emails from a fictional API.
  - **EmailImportService**: Imports emails and transforms them into messages.
  - **MessageDisplayService**: Displays a list of messages and threads stored in the database for debugging purposes.

We encourage you to delve into these folders and files to get a deeper understanding of the application before starting the assignment.

## Assignment

### Preamble

In this assignment, we will assess the following key criteria:

- Code readability
- Simplicity and effectiveness of implementations
- For text responses that do not involve code changes: clarity and structural organization of the explanations

### Task 1: Group messages by threads

As you may have noticed, the `import` method of the `EmailImportService` creates a default thread and assigns all messages to it. This is not the expected behavior. The goal is to group messages by threads. There are two headers that are part of the email protocol that can be used to do this: `In-Reply-To` and `Message-Id`. Each email has a unique `Message-Id` header and an optional `In-Reply-To` header that contains the `Message-Id` of the email it is replying to. In a threaded conversation, these headers form a chain of references. Specifically, the `In-Reply-To` header in each subsequent email points to the `Message-Id` of the email it's replying to, naturally grouping them into a thread. This chaining mechanism is what allows emails to be organized into coherent threads.

In the current project, the `Message-Id` and `In-Reply-To` header values are retrieved and stored in the `universalMessageId` and `inReplyTo` properties of the `EmailMessage` entity. In the `import` method of the `EmailImportService`, the const `fetchedEmails` is an array of `EmailMessage`s.

Theorically, you should compare the `inReplyTo` property with the `universalMessageId` values stored in the database. However, to simplify this first task, you can just group messages by threads with emails freshly imported from the API which are stored in memory (`fetchedEmails`).

Concretely, when running `yarn start`, the console should display messages grouped by threads, whereas currently they are all grouped into the same default thread.

Notes: 
- The email API does not return items in a chronological order.
- The RFC 5322 [defines](https://datatracker.ietf.org/doc/html/rfc5322#section-3.6.4) the structure of `Message-Id` as being akin to an email address format, which explains why message IDs are imported as a `Contact` instance.

### Task 2: Take messages stored in database into account

In the first task, you organized messages into threads by matching the `In-Reply-To` field with the `Message-Id` field, but this was limited to emails freshly fetched and loaded into memory. However, consider the scenario where emails matching the `In-Reply-To` value are not present in the `fetchedEmails` array but have instead been stored in the database from a previous run of the `EmailImportService`.

#### Questions

1. To include messages already stored in the database, which existing repository method should be leveraged?
2. Describe how you would use this method to achieve the intended outcome. Implementation details are not required, just a clear explanation of your approach.

### Task 3: Display the domain name of the sender

In the `MessageDisplayService`, how would you display the domain name of the sender's email address for each email? Think about the best way to **_encapsulate_** the logic for extracting the domain name and **where** it should be placed in the codebase.

### Task 4: Preventing Duplicate Imports in Parallel Email Processing

Consider a scenario where emails of different users are imported daily through parallel execution processes. When multiple users interact with the service, it's possible for the service to import emails having the same `Message-Id` (for example, when user A sends an email to users B and C, both B and C will have emails in their inboxes with the same `Message-Id`).

Given that import processes are executed in parallel, there's a risk that emails corresponding to a specific `Message-Id` might be imported multiple times. Explain how you would ensure that only a single instance of an email is imported for each unique `Message-Id`? Your response may involve infrastructure or architectural changes if needed, but this is not required. Do not implement the solution, just describe the approach you would take.

### Task 5: Testing

What do you believe is the most effective strategy for testing this project? What is your philosophy regarding testing?

## Feedback

Your insights and feedback on the project and the process are invaluable. Please share your thoughts after you have completed the assignment.
