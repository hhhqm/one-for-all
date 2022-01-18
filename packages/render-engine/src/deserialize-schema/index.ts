import { logger } from '@ofa/utils';
import type * as SchemaSpec from '@ofa/schema-spec';

import type { SchemaNode, CTX } from '../types';
import deserialize from './deserialize';

function deserializeSchema(node: SchemaSpec.SchemaNode, ctx: CTX): SchemaNode | null {
  try {
    deserialize(node, ctx);
    return node as SchemaNode;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export default deserializeSchema;
