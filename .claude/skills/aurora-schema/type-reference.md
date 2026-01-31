# Type Selection Guide

| Use Case            | Type            | Configuration                  | Notes                                         |
| ------------------- | --------------- | ------------------------------ | --------------------------------------------- |
| UUID identifiers    | `id`            | NO `length` property           | **CRITICAL: Never add `length` to `id` type** |
| Short text          | `varchar`       | `maxLength: N`                 | Names, titles, codes                          |
| Long text           | `text`          | -                              | Descriptions, content                         |
| Fixed-length text   | `char`          | `length: N`                    | Country codes, currency                       |
| Passwords           | `password`      | -                              | Auto-hashed by Aurora                         |
| Integer counters    | `int`           | -                              | Standard integers                             |
| Large numbers       | `bigint`        | -                              | > 2 billion                                   |
| Small numbers       | `smallint`      | -                              | 0-255 range                                   |
| Money/decimals      | `decimal`       | `decimals: [precision, scale]` | Never use float for money                     |
| Approximate         | `float`         | -                              | Scientific only                               |
| Date + time         | `timestamp`     | -                              | Most common                                   |
| Date only           | `date`          | -                              | Birthdays, deadlines                          |
| True/false          | `boolean`       | -                              | Use is*/has*/can* prefix                      |
| Fixed options       | `enum`          | `enumOptions: [...]`           | Document each option                          |
| Structured data     | `json`, `jsonb` | -                              | Use jsonb for PostgreSQL                      |
| Navigation property | `relationship`  | `relationship: {...}`          | One-to-many, many-to-many inverse side        |

## Varchar Length Standards (Byte-Optimized)

These lengths are optimized for PostgreSQL byte storage efficiency:

| Length | Use Case Examples                       |
| ------ | --------------------------------------- |
| 1      | Single character flags, gender (M/F)    |
| 4      | Country codes (US, ES), file extensions |
| 8      | Short codes, abbreviations              |
| 16     | Short identifiers, codes                |
| 36     | UUIDs in string format                  |
| 64     | Short names, usernames, slugs           |
| 128    | Names, titles, email addresses          |
| 255    | Standard text fields                    |
| 382    | Medium text, short descriptions         |
| 510    | Longer descriptions, addresses          |
| 1022   | Long text that needs indexing           |
| 2046   | URLs, very long text with length limit  |

**Quick reference for common fields:**

| Field Type         | Recommended Length |
| ------------------ | ------------------ |
| UUID as string     | 36                 |
| Username           | 64                 |
| Email              | 128                |
| Name/Title         | 128                |
| Phone              | 64                 |
| Short description  | 255                |
| Medium description | 510                |
| Long description   | 1022               |
| URL/Link           | 2046               |

## Decision Tree: What Type Should This Field Be?

```
Is it a UUID identifier? ────YES───> type: id (NO length!)
      │ NO
Is it true/false? ────YES───> type: boolean (use is*/has*/can* prefix)
      │ NO
Is it money? ────YES───> type: decimal with decimals: [12, 2]
      │ NO
Fixed set of options? ────YES───> type: enum with enumOptions
      │ NO
Date and time? ────YES───> type: timestamp
      │ NO
Short text (< 255 chars)? ────YES───> type: varchar with maxLength
      │ NO
Long text? ────YES───> type: text
```
