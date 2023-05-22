export interface SchemaQuery {
  fields: Array<SchemaQueryField>;
}

export interface SchemaQueryField {
  name: string;
  description: string;
  args?: Array<SchemaQueryFieldArgs>;
}

export interface SchemaQueryFieldArgs {
  name: string;
  description: string;
}

export interface SchemaMutation {
  fields: Array<SchemaMutationField>;
}

export interface SchemaMutationField {
  name: string;
  description: string;
  type?: SchemaMutationFieldType;
}

export interface SchemaMutationFieldType {
  name: string;
  fields: Array<SchemaQueryFieldArgs>;
}

export interface DocumentationDrawerProps {
  openDrawer: boolean;
  onCloseDrawer: () => void;
  githubToken: string;
}

export interface QueryFieldsProps {
  key: number;
  el: SchemaQueryField;
  index: number;
  showDrawerArgs: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ArgsProps {
  currentArgs: Array<SchemaQueryFieldArgs>;
  queryNameArgs: string;
  openArgs: boolean;
  closeArgs: () => void;
}
