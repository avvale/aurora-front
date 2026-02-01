# Confirmation Dialog Pattern

Use `confirmationService` (provided by `ViewBaseComponent`) to open confirmation
dialogs before destructive or important actions.

## Pattern

```typescript
case 'common::country.list.delete':
    const deleteDialog = this.confirmationService.open({
        title: this.translocoService.translate('common.Country'),
        message: this.translocoService.translate('DeletionQuestion', {
            entity: this.translocoService.translate('common.Country'),
        }),
        icon: {
            show: true,
            name: 'heroicons_outline:exclamation-triangle',
            color: 'warn',
        },
        actions: {
            confirm: {
                show: true,
                label: this.translocoService.translate('Remove'),
                color: 'warn',
            },
            cancel: {
                show: true,
                label: this.translocoService.translate('Cancel'),
            },
        },
        dismissible: true,
    });

    deleteDialog.afterClosed().subscribe(async (result) => {
        if (result === 'confirmed') {
            try {
                await lastValueFrom(
                    this.countryService.deleteById<CommonCountry>({
                        id: action.meta.row.id,
                    }),
                );
                // Refresh the grid after action
                this.actionService.action({
                    id: 'common::country.list.pagination',
                    isViewAction: false,
                });
            } catch (error) {
                log(`[DEBUG] Error: ${error}`);
            }
        }
    });
    break;
```

## Icon Colors

| Color     | Use For                             |
| --------- | ----------------------------------- |
| `warn`    | Destructive actions (delete, cancel) |
| `primary` | Confirmatory actions (approve, provision) |

## Key Rules

- Always provide `cancel` action for user escape
- Use `dismissible: true` to allow closing by clicking outside
- Check `result === 'confirmed'` — any other value means cancelled/dismissed
- Refresh the grid after successful mutation with
  `this.actionService.action({ id: '...list.pagination', isViewAction: false })`
