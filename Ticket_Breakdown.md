# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1: Add Custom ID input on Agent page

User Story: As a Facility owner, I want to be able to add a custom ID to Agents that worked in my Facility, such that I can identify them in reports.

Description: This ticket includes:

- add a new column in the database - Agent table
- create unique constraint on the Agent ID and Facility ID
- add a new field on the Agent edit screen/modal [string / optional]
- update endpoint/GraphQL mutation so that when a value is added into the field, it is saved into the database column
- add validation that prevents the user from entering code snippets (prevent XSS)
- add max length validation (32 chars)
- display error message if the value inputted is not unique
- make sure the field is keyboard accessible

Effort: 8 sp

^ This is more like a feature, which is one of the ways I've worked before, but if the preference is to have small tickets, this could be broken up into:
Ticket 1.1: Add Custom Agent ID column in database and unique constraint
Ticket 1.2: Update Agent PUT/PATCH endpoint to save the field and GET endpoint to return the field
Ticket 1.3: Add field in the Agent edit screen/modal and tie it to the endpint
Ticket 1.4: Add validation to Custom Agent ID

### Ticket 2: Add Custom Agent ID in the Report Configuration Page

User Story: As a Facility owner who is able to select which fields appear in my reports, I want to be able to select the Custom Agent ID so that I can see it in the generated report

Description: On the Report Config Page, add "Custom Agent ID" in the "Report Fields" select dropdown so that the Facility owner can add it into their reports. There is no requirement for the new Custom Agent ID field to automatically replace the existing AgentID. The Facility owner is solely reposonsible for what they want to display in their reports, so having both ids is acceptable at this point.
Make sure the field selection is persisted in the Report Configuration for this Facility.

Effort: 3 sp

### Ticket 3: Display the Custom Agent ID in the generated report PDF

User Story: As a Facility owner who has selected the Custom Agent ID to be displayed in my reports, I want to be able to see the field in the generated PDF.

Description:

- Check the Report Configuration and if the Custom Agent ID was selected, add it to the PDF in the Agent section for each Shift.
- Make sure the Custom Agent ID field label doesn't show up if the field was not selected in the Report Configuration.
- Make sure using a 32 character (max) custom id doesn't break the PDF layout and is displayed in full.
- if the Report Configuration contains the Custom Agent ID field but there is no value for a specific Agent, remove the field label.

Effort: 5 sp
