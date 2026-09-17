export type ColumnType = "text" | "date" | "datetime" | "array" | "number" | "select";

export type ColumnConfig = {
  key: string;
  label: string;
  type: ColumnType;
  editable?: boolean;
  options?: string[];
};

export type DashboardTableConfig = {
  key: string;
  label: string;
  tableId: string;
  columns: ColumnConfig[];
  deletable: boolean;
  nameField: string;
  dateField: string;
  detailField?: string;
};

const BASE_ID = "appXyMV3O6ycSVRAi";

export const DASHBOARD_TABLES: Record<string, DashboardTableConfig> = {
  quiz: {
    key: "quiz",
    label: "Quiz Entries",
    tableId: "tblukJS1pCXs85ydk",
    nameField: "Name",
    dateField: "Submitted At",
    detailField: "Answers (JSON)",
    deletable: true,
    columns: [
      { key: "Name", label: "Name", type: "text" },
      { key: "Phone", label: "Phone", type: "text" },
      { key: "Score", label: "Score", type: "number", editable: true },
      { key: "Eligible for Draw", label: "Eligible", type: "text" },
      {
        key: "Draw Status",
        label: "Draw Status",
        type: "select",
        editable: true,
        options: ["Pending", "Contacted", "Winner", "Disqualified"],
      },
      { key: "Submitted At", label: "Submitted", type: "datetime" },
    ],
  },
  "viewer-leads": {
    key: "viewer-leads",
    label: "Viewer Leads",
    tableId: "tblWuPMHzBHoc8wjF",
    nameField: "Name",
    dateField: "Submitted At",
    deletable: false,
    columns: [
      { key: "Name", label: "Name", type: "text" },
      { key: "Phone", label: "Phone", type: "text" },
      { key: "Interests", label: "Interests", type: "array" },
      { key: "Submitted At", label: "Submitted", type: "date" },
      {
        key: "Status",
        label: "Status",
        type: "select",
        editable: true,
        options: ["New", "Contacted", "Closed"],
      },
    ],
  },
  "presenter-leads": {
    key: "presenter-leads",
    label: "Presenter Leads",
    tableId: "tblYEsFb2gKyPariy",
    nameField: "Name",
    dateField: "Submitted At",
    deletable: false,
    columns: [
      { key: "Name", label: "Name", type: "text" },
      { key: "Phone", label: "Phone", type: "text" },
      { key: "Interests", label: "Show", type: "text" },
      { key: "Submitted At", label: "Submitted", type: "date" },
      {
        key: "Status",
        label: "Status",
        type: "select",
        editable: true,
        options: ["New", "Contacted", "Closed"],
      },
    ],
  },
  "rate-card": {
    key: "rate-card",
    label: "Rate Card Enquiries",
    tableId: process.env.AIRTABLE_RATE_CARD_TABLE_ID ?? "tbliYbLcpLfLal9An",
    nameField: "Name",
    dateField: "Submitted At",
    deletable: false,
    columns: [
      { key: "Name", label: "Name", type: "text" },
      { key: "Phone", label: "Phone", type: "text" },
      { key: "Company", label: "Company", type: "text" },
      { key: "Email", label: "Email", type: "text" },
      { key: "Ad Type", label: "Ad Type", type: "text" },
      { key: "Packages", label: "Packages", type: "text" },
      { key: "Submitted At", label: "Submitted", type: "datetime" },
      {
        key: "Status",
        label: "Status",
        type: "select",
        editable: true,
        options: ["New", "Contacted", "Closed"],
      },
    ],
  },
  "ad-submissions": {
    key: "ad-submissions",
    label: "Ad Submissions",
    tableId: process.env.AIRTABLE_AD_TABLE_ID ?? "tblifCk8Mp05lyyVo",
    nameField: "Contact Name",
    dateField: "Submitted At",
    deletable: false,
    columns: [
      { key: "Contact Name", label: "Contact", type: "text" },
      { key: "Phone", label: "Phone", type: "text" },
      { key: "Email", label: "Email", type: "text" },
      { key: "Company", label: "Company", type: "text" },
      { key: "Ad Type", label: "Ad Type", type: "text" },
      { key: "Ad Duration", label: "Duration", type: "text" },
      { key: "Flight Start", label: "Flight Start", type: "date" },
      { key: "Flight End", label: "Flight End", type: "date" },
      { key: "Submitted At", label: "Submitted", type: "datetime" },
      {
        key: "Status",
        label: "Status",
        type: "select",
        editable: true,
        options: ["New", "Contacted", "Closed"],
      },
    ],
  },
  "radio-requests": {
    key: "radio-requests",
    label: "Radio Requests",
    tableId: "tbl97g7j9lQ8WJXJU",
    nameField: "Name",
    dateField: "Submitted At",
    deletable: true,
    columns: [
      { key: "Name", label: "Name", type: "text" },
      { key: "Request", label: "Request", type: "text" },
      { key: "Submitted At", label: "Submitted", type: "datetime" },
      {
        key: "Status",
        label: "Status",
        type: "select",
        editable: true,
        options: ["New", "Played", "Dismissed"],
      },
    ],
  },
};

export const DASHBOARD_TABLE_KEYS = Object.keys(DASHBOARD_TABLES);

export function getTableConfig(key: string): DashboardTableConfig | undefined {
  return DASHBOARD_TABLES[key];
}

export { BASE_ID };
