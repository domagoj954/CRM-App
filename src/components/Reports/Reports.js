import React, { Component } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font
} from "@react-pdf/renderer";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { AppBar, Tabs, Tab } from "@mui/material";
import { withStyles } from "@mui/styles";
import RobotoBold from "../../assets/fonts/RobotoBold.ttf"
import RobotoMedium from "../../assets/fonts/RobotoMedium.ttf"


Font.register({
  family: "Roboto",
  fonts: [
    {
      src: RobotoBold,
      fontWeight: "bold",
    },
    {
      src: RobotoMedium,
      fontWeight: "normal",
    },
  ],
});

const urlSales = "http://localhost:3001/reportsSales";
const urlEngagements = "http://localhost:3001/engagements";

const stylesTable = (theme) => ({
  appBar: {
    backgroundColor: "blue", // Change the background color
  },
  tabs: {
    backgroundColor: "white", // Change the tabs background color
  },
  tab: {
    minWidth: "auto", // Adjust tab width as needed
    textTransform: "none", // Prevent label text transformation
  },
  downloadButton: {
    marginTop: "10px",
    backgroundColor: "#007BFF" /* Change the background color */,
    color: "#fff" /* Change the text color */,
    padding: "10px 20px" /* Adjust padding as needed */,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
});

const styles = StyleSheet.create({
  reportTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto"
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCellHeader: {
    fontSize: 24,
    width: "20%",
    backgroundColor: "#bdd4f2",
    padding: 5,
    fontWeight: "bold",
    fontFamily: "Roboto",
    borderColor: "#000",  // Border color
    borderStyle: "solid", // Border style
    borderWidth: 1,        // Border width
    borderRadius: 5,      // Border radius (adjust as needed)
  },
  tableCell: {
    backgroundColor: "#ebf4f5",
    fontSize: 18,
    width: "20%",
    textAlign:"center",
    padding: 5,
    fontWeight: "normal",
    fontFamily: "Roboto",
    borderColor: "#000",  // Border color
    borderStyle: "solid", // Border style
    borderWidth: 1,        // Border width
    borderRadius: 3,      // Border radius (adjust as needed)
  },
});

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      engagements: [],
      currentView: "sales",
      sortedReports: [],
      sortedEngagements: [],
      isSorted: false, 


    };
  }

  componentDidMount() {
    this.fetchSalesReports();
    this.fetchEngagementsReports();
  }

  fetchEngagementsReports() {
    axios
      .get(urlEngagements)
      .then((response) => {
        const engagementsData = response.data;

        const clientNamePromises = engagementsData.map((report) => {
          const clientId = report.client_id;
          const clientDetailsUrl = `http://localhost:3001/clients/${clientId}`;

          return axios
            .get(clientDetailsUrl)
            .then((clientResponse) => {
              const clientData = clientResponse.data;
              return { ...report, client_name: clientData.name };
            })
            .catch((error) => {
              console.error(
                "Error fetching client details for engagements report:",
                error
              );
              return { ...report, client_name: "Client Details Not Found" };
            });
        });

        // Wait for all the promises to resolve
        Promise.all(clientNamePromises)
          .then((engagementsWithClientNames) => {
            this.setState({ engagements: engagementsWithClientNames });
          })
          .catch((error) => {
            console.error(
              "Error with fetching client names for engagements reports:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error with fetching engagements reports:", error);
      });
  }

  fetchSalesReports() {
    axios
      .get(urlSales)
      .then((response) => {
        const reportsData = response.data;

        // Create an array of promises to fetch client names for each client_id
        const clientNamePromises = reportsData.map((report) => {
          const clientId = report.client_id;
          // Assuming your API endpoint for fetching client details by ID is something like this
          const clientDetailsUrl = `http://localhost:3001/clients/${clientId}`;

          return axios
            .get(clientDetailsUrl)
            .then((clientResponse) => {
              const clientData = clientResponse.data;
              return { ...report, client_name: clientData.name };
            })
            .catch((error) => {
              console.error("Error fetching client details:", error);
              // Handle the error as needed (e.g., set client_name to an error message)
              return { ...report, client_name: "Client Details Not Found" };
            });
        });

        // Wait for all the promises to resolve
        Promise.all(clientNamePromises)
          .then((reportsWithClientNames) => {
            this.setState({ reports: reportsWithClientNames });
          })
          .catch((error) => {
            console.error(
              "Error with fetching client names for reports:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error with fetching reports:", error);
      });
  }

  generatePDFSales(data) {
    return (
      <Document>
        <Page size="A2">
          <View>
            <Text style={styles.reportTitle}>Sales Report</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>Client Name</Text>
                <Text style={styles.tableCellHeader}>Sale name</Text>
                <Text style={styles.tableCellHeader}>Quantity</Text>
                <Text style={styles.tableCellHeader}>Status</Text>
                <Text style={styles.tableCellHeader}>Description</Text>

              </View>

              {/* Table Rows */}
              {data.map((report) => (
                <View key={report.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{report.client_name}</Text>
                  <Text style={styles.tableCell}>{report.saleName}</Text>
                  <Text style={styles.tableCell}>{report.quantity}</Text>
                  <Text style={styles.tableCell}>{report.status}</Text>
                  <Text style={styles.tableCell}>{report.description}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  generatePDFEngagements(data) {
    return (
      <Document>
        <Page size="A2">
          <View>
            <Text style={styles.reportTitle}>Engagement report</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCellHeader}>Client Name</Text>
                <Text style={styles.tableCellHeader}>
                  Engagement Start Date
                </Text>
                <Text style={styles.tableCellHeader}>Engagement End Date</Text>
                <Text style={styles.tableCellHeader}>Profit Center</Text>
                <Text style={styles.tableCellHeader}>Price</Text>
              </View>

              {/* Table Rows */}
              {data.map((report) => (
                <View key={report.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{report.client_name}</Text>
                  <Text style={styles.tableCell}> {new Date(report.engagementStart).toLocaleDateString()}</Text>
                  <Text style={styles.tableCell}>{new Date(report.engagementEnd).toLocaleDateString()}</Text>
                  <Text style={styles.tableCell}>{report.profitCenter}</Text>
                  <Text style={styles.tableCell}>{report.price}</Text>
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }
  sortData(data, sortModel, isSales = true) {
    if (sortModel.length === 0) {
      return data;
    }
  
    const sortedData = [...data];
  
    sortedData.sort((a, b) => {
      for (const sort of sortModel) {
        const field = sort.field;
        const direction = sort.sort;
        const aValue = a[field];
        const bValue = b[field];
  
        if (direction === 'asc') {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
        } else if (direction === 'desc') {
          if (aValue < bValue) return 1;
          if (aValue > bValue) return -1;
        }
      }
  
      return 0;
    });
  
    return sortedData;
  }


  switchToSalesView = () => {
    this.setState({ currentView: "sales" });
  };

  handleTabChange = (event, newValue) => {
    this.setState({ 
      currentView: newValue,
      isFiltered: false, 
    });
  };

  render() {
    const { reports, engagements, currentView } = this.state;
    const { classes } = this.props;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;

    const columnsSales = [
      { field: "client_name", headerName: "Client Name", width: 250 },
      { field: "saleName", headerName: "Sale Name", width: 200 },
      { field: "quantity", headerName: "Quantity", width: 100 },
      { field: "description", headerName: "Description", width: 300 },
      { field: "status", headerName: "Status", width: 150 },
    ];

    const columnsEngagements = [
      { field: "client_name", headerName: "Client Name", width: 250 },
      {
        field: "engagementStart",
        headerName: "Engagement Start Date",
        width: 300,
        valueGetter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
      },
      {
        field: "engagementEnd",
        headerName: "Engagement End Date",
        width: 300,
        valueGetter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
      },
      { field: "profitCenter", headerName: "Profit Center", width: 300 },
      { field: "price", headerName: "Price", width: 150 },
    ];

    return (
      <div>
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={currentView}
            onChange={this.handleTabChange} // Use handleTabChange for tab changes
            className={classes.tabs}
          >
            <Tab label="Sales" value="sales" className={classes.tab} />
            <Tab
              label="Engagements"
              value="engagements"
              className={classes.tab}
            />
          </Tabs>
        </AppBar>
        {currentView === "sales" && (
          <div>
            <h1>Sales Report</h1>
            <div>
              {reports.length > 0 ? (
                <DataGrid
                rows={reports}
                columns={columnsSales}
                  pagination
                  pageSize={5}
                  disableSelectionOnClick
                  onSortModelChange={(sortModel) => {
                    this.setState({ sortedReports: [] }, () => {
                      const sortedData = this.sortData(reports, sortModel, true);
                      this.setState({ sortedReports: sortedData,  isSorted: true,});
                    });
                  }}
                  onFilterModelChange={(filterModel) => {
                    // Filter logic here
                    const filteredData = this.filterData(reports, filterModel, true);
                    this.setState({ filteredReports: filteredData, isFiltered: true });
                  }}
                />
              ) : (
                <p>No Sales data available</p>
              )}
            </div>
            {this.state.isSorted && (
  <PDFDownloadLink
    document={this.generatePDFSales(this.state.sortedReports)}
    fileName={`Sales Report-${formattedDate}.pdf`}
  >
    {({ blob, url, loading, error }) => (
      <div>
        {error ? (
          <p>Error: Unable to generate PDF</p>
        ) : (
          <button
            className={classes.downloadButton}
          >
            {loading ? "Loading document..." : "Download Sales"}
          </button>
        )}
      </div>
    )}
  </PDFDownloadLink>
)}

{!this.state.isSorted && (
  <PDFDownloadLink
    document={this.generatePDFSales(this.state.reports)}
    fileName={`Sales Report-${formattedDate}.pdf`}
  >
    {({ blob, url, loading, error }) => (
      <div>
        {error ? (
          <p>Error: Unable to generate PDF</p>
        ) : (
          <button
            className={classes.downloadButton}
          >
            {loading ? "Loading document..." : "Download Sales"}
          </button>
        )}
      </div>
    )}
  </PDFDownloadLink>
)}
          </div>
        )}
        {currentView === "engagements" && (
          <div>
            <h1>Engagements Report</h1>

            <div>
              {engagements.length > 0 ? (
                <DataGrid
                  rows={engagements}
                  columns={columnsEngagements}
                  pagination
                  pageSize={5}
                  disableSelectionOnClick
                  onSortModelChange={(sortModel) => {
                    this.setState({ sortedEngagements: [] }, () => {
                      const sortedData = this.sortData(engagements, sortModel, false);
                      this.setState({ sortedEngagements: sortedData,  isSorted: true,});
                    });
                  }}
                />
              ) : (
                <p>No Engagement data available</p>
              )}
            </div>
            {this.state.isSorted && (
            <PDFDownloadLink
              document={this.generatePDFEngagements(this.state.sortedEngagements)}
              fileName={`Engagements Report-${formattedDate}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <div>
                  {error ? (
                    <p>Error: Unable to generate PDF</p>
                  ) : (
                    <button
                      className={classes.downloadButton}

                    >
                      {loading ? "Loading document..." : "Download Engagements"}
                    </button>
                  )}
                </div>
              )}
            </PDFDownloadLink>
            )}
            {!this.state.isSorted && (
            <PDFDownloadLink
              document={this.generatePDFEngagements(engagements)}
              fileName={`Engagements Report-${formattedDate}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <div>
                  {error ? (
                    <p>Error: Unable to generate PDF</p>
                  ) : (
                    <button
                      className={classes.downloadButton}

                    >
                      {loading ? "Loading document..." : "Download Engagements"}
                    </button>
                  )}
                </div>
              )}
            </PDFDownloadLink>
            )}
           
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(stylesTable)(Reports);
