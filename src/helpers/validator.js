import SwaggerParser from '@apidevtools/swagger-parser';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const specPath = path.join(__dirname, '../../openapi.yaml');

const spec = await SwaggerParser.dereference(specPath);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Build index: operationId -> { '200': schema, '201': schema, ... }
const operationIndex = {};
for (const methods of Object.values(spec.paths)) {
  for (const op of Object.values(methods)) {
    if (!op.operationId) continue;
    operationIndex[op.operationId] = {};
    for (const [code, resp] of Object.entries(op.responses ?? {})) {
      const schema = resp.content?.['application/json']?.schema;
      if (schema) operationIndex[op.operationId][code] = schema;
    }
  }
}

export function validate(operationId, statusCode, data) {
  const op = operationIndex[operationId];
  if (!op) throw new Error(`Operation "${operationId}" not found in openapi.yaml`);

  const schema = op[String(statusCode)];
  if (!schema) throw new Error(`No response schema for "${operationId}" → ${statusCode}`);

  const valid = ajv.validate(schema, data);
  if (!valid) {
    throw new Error(
      `Schema validation failed [${operationId} ${statusCode}]:\n` +
      ajv.errorsText(ajv.errors, { separator: '\n' })
    );
  }
}
