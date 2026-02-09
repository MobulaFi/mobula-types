# Changelog

## [0.1.2] - 2026-01-12

### Added
- `SinglePositionBatchParamsSchema` - Schema for batch wallet position requests
- `SinglePositionBatchResponseSchema` - Schema for batch wallet position responses
- `batchPositionItemSchema` - Extended position schema with `wallet` field for batch identification
- `BatchPositionItem` type export
- `WalletPositionParams`, `WalletPositionResponse`, `WalletPositionBatchParams`, `WalletPositionBatchResponse` type aliases for SDK consistency

### Changed
- Batch position responses now include `wallet` field in each item for easier identification when querying multiple wallets

## [0.1.1] - 2026-01-10

### Added
- Initial release with core schemas for Mobula API

