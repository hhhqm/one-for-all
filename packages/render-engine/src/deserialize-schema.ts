import {
  NodeProp,
  instantiatedSchema,
  ISRawSchema,
  Schema,
  FunctionSpecs,
  APIState,
  SchemaNode,
  NodeProps,
} from './types';

function instantiateFuncSpec({ type, args, body }: FunctionSpecs): ((...args: any[]) => any) | undefined {
  if (type === 'api_derive_function') {
    return new Function('apiState', body) as (apiState: APIState) => any;
  }

  if (type === 'api_invoke_convertor_function') {
    return new Function(args, body) as (...args: any[]) => any;
  }

  if (type === 'api_invoke_call_function') {
    return new Function('apiState', body) as (...args: any[]) => any;
  }

  return;
}

function transformProps(props: NodeProps<ISRawSchema.YES>): NodeProps<ISRawSchema.NO> {
  return Object.entries(props).map<[string, NodeProp<ISRawSchema.NO>]>(([propName, propDesc]) => {
    // instantiate Array<APIInvokeProperty<T>>
    if (Array.isArray(propDesc)) {
      return [
        propName,
        propDesc.map(({ type, stateID, convertor, onSuccess, onError }) => {
          return {
            type,
            stateID,
            convertor: convertor ? instantiateFuncSpec(convertor) : undefined,
            onSuccess: onSuccess ? instantiateFuncSpec(onSuccess) : undefined,
            onError: onError ? instantiateFuncSpec(onError) : undefined,
          };
        }),
      ];
    }

    if (propDesc.type === 'constant_property') {
      return [propName, propDesc];
    }

    if (propDesc.type === 'api_derived_property') {
      return [propName, {
        ...propDesc,
        convertor: propDesc.convertor ? instantiateFuncSpec(propDesc.convertor) : undefined,
      }];
    }

    return [propName, {
      ...propDesc,
      convertor: propDesc.convertor ? instantiateFuncSpec(propDesc.convertor) : undefined,
      onSuccess: propDesc.onSuccess ? instantiateFuncSpec(propDesc.onSuccess) : undefined,
      onError: propDesc.onError ? instantiateFuncSpec(propDesc.onError) : undefined,
    }];
  }).reduce<NodeProps<ISRawSchema.NO>>((acc, [propName, propDesc]) => {
    acc[propName] = propDesc;
    return acc;
  }, {});
}

function transformNode(node: SchemaNode<ISRawSchema.YES>): SchemaNode<ISRawSchema.NO> {
  const children = (node.children || []).map((n) => transformNode(n));

  return {
    ...node,
    children,
    props: transformProps(node.props || {}),
  };
}

export default function deserializeSchema({ node, statesMap }: Schema): instantiatedSchema | null {
  try {
    return { statesMap, node: transformNode(node) };
  } catch (error) {
    return null;
  }
}