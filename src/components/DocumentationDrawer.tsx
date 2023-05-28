import React, { useEffect, useState } from 'react';
import { Button, Divider, Drawer, Spin, Typography } from 'antd';
import { makeRequest } from '../service/helpers';
import {
  DocumentationDrawerProps,
  SchemaMutation,
  SchemaQuery,
  SchemaQueryFieldArgs,
} from '../types/types';
import { QueryFields } from './QueryFields';
import { MutationFields } from './MutationFields';
import { Args } from './Args';
import { useLanguage } from '../hooks/useLanguage';

export const DocumentationDrawer = (props: DocumentationDrawerProps) => {
  const [schemaQuery, setSchemaQuery] = useState<SchemaQuery | null>(null);
  const [schemaMutation, setSchemaMutation] = useState<SchemaMutation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isSchemaQuery, setIsSchemaQuery] = useState(false);
  const [isSchemaMutation, setIsSchemaMutation] = useState(false);

  const [queryNameArgs, setQueryNameArgs] = useState('');
  const [currentArgs, setCurrentArgs] = useState<Array<SchemaQueryFieldArgs>>([]);
  const [openArgs, setOpenArgs] = useState(false);

  const editor = useLanguage('editor');

  const queryType =
    'query {__schema { queryType {fields {name: name args {name description}description}}}}';
  const mutationType =
    'query {__schema { mutationType {fields {name: name type {name fields {name description}}description}}}}';

  useEffect(() => {
    setIsLoading(false);
  }, [schemaQuery, schemaMutation]);

  const ShowQuery = () => {
    setIsLoading(true);
    setIsSchemaMutation(false);
    setIsSchemaQuery(true);
    makeRequest(queryType, props.githubToken).then((result) => {
      setSchemaQuery(result.data.__schema.queryType);
    });
  };

  const ShowMutation = () => {
    setIsLoading(true);
    setIsSchemaQuery(false);
    setIsSchemaMutation(true);
    makeRequest(mutationType, props.githubToken).then((result) => {
      setSchemaMutation(result.data.__schema.mutationType);
    });
  };

  const showDrawerArgs = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.MouseEvent<HTMLAnchorElement, MouseEvent>, type: string) => {
    setQueryNameArgs(event.currentTarget.innerText);
    if (type === 'args') {
      const args = schemaQuery?.fields.find((el) => el.name === event.currentTarget.innerText);
      if (args) setCurrentArgs(args[type]!);
    }

    if (type === 'type') {
      const args = schemaMutation?.fields.find((el) => el.name === event.currentTarget.innerText);
      if (args) setCurrentArgs(args[type]!.fields);
    }
    setOpenArgs(true);
  };

  const closeArgs = () => {
    setOpenArgs(false);
  };

  return (
    <Drawer
      title={editor?.documentation}
      placement="right"
      width={500}
      onClose={props.onCloseDrawer}
      open={props.openDrawer}
    >
      <Typography.Text>Fields</Typography.Text>
      <Divider />
      <span>query:</span>
      <Button type="link" onClick={() => ShowQuery()}>
        Query
      </Button>
      <span>mutation:</span>
      <Button type="link" onClick={() => ShowMutation()}>
        Mutation
      </Button>

      <Divider />

      {isLoading && (
        <Spin style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      )}

      {schemaQuery && isSchemaQuery && !isLoading
        ? schemaQuery.fields.map((el, index) => (
            <QueryFields
              key={index}
              el={el}
              index={index}
              showDrawerArgs={(e) => showDrawerArgs(e, 'args')}
            />
          ))
        : schemaMutation &&
          isSchemaMutation &&
          !isLoading &&
          schemaMutation.fields.map((el, index) => (
            <MutationFields key={index} el={el} showDrawerArgs={(e) => showDrawerArgs(e, 'type')} />
          ))}
      {openArgs && (
        <Args
          currentArgs={currentArgs}
          queryNameArgs={queryNameArgs}
          openArgs={openArgs}
          closeArgs={closeArgs}
        />
      )}
    </Drawer>
  );
};
