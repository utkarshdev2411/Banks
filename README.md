

# Bank Data REST API

The problem involved creating REST API endpoints to access and manage bank branch data. Here's a breakdown of the method I used to solve it:

## Understanding the Requirements
- Identified the need for two API endpoints:
  - **`/bank-list`** to retrieve a list of unique banks.
  - **`/bank-branches/:bankID/:bankBranch`** to get details of a specific branch based on bank ID and branch name provided in the URL parameters.
- Data for these endpoints was fetched from a CSV file named `bank_branches.csv`.

## Choosing Technologies
- Node.js with Express.js was chosen to build the REST API server.
- The `csv-parser` library was used for efficient CSV parsing.

## Data Parsing and Storage
- The code utilizes `fs.createReadStream` and `csv-parser` to read the CSV file asynchronously.
- Parsed data is stored in the `bankData` array, making it accessible for the API endpoints.

## Designing API Endpoints
- **`/bank-list`**:
  - Extracts unique bank names from `bankData` using a `Set` to eliminate duplicates.
  - Creates a JSON representation of each bank with `bank_name` and `bank_id` (assuming those columns exist).
  - Responds with the list of unique banks as JSON.
  
- **`/bank-branches/:bankID/:bankBranch`**:
  - Retrieves bank ID and branch name from URL parameters.
  - Filters `bankData` to find branches matching those criteria.
  - Returns the matching branches as JSON or a 404 "Not Found" error if no match is found.

## Addressing Potential Improvements
- Suggested additional considerations for error handling, input validation, and code structure to enhance the code's robustness and maintainability.

By following these steps, I was able to provide a comprehensive solution that addresses the prompt's requirements and incorporates best practices for REST API development.

---

This syntax provides a clear and structured explanation of the problem, solution, and methodologies used, making it easy for others to understand the project when they view the `README.md` file on GitHub.
