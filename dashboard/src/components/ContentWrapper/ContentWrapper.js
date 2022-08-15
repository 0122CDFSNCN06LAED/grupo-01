import { Component } from "react";
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";
import { Switch, Route } from "react-router-dom";
import ContentRowTop from "../ContentRowTop/ContentRowTop";
import LastsProductsInDB from "../LastsProductsInDB/LastsproductsInDB";
import TableProductsList from "../TableProcuts/TableProducts";
import TableUsersList from "../TableUsers/TableUsers";
import ContentProductsInDB from "../ContentProductsInDb/ContentProductsInDb";

class ContentWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null,
    };
  }
  render() {
    if (!this.state.products) {
      return "Cargando...";
    }
    return (
      <>
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            <TopBar />

            <Switch>
              <Route path="/" exact={true} component={ContentRowTop} />
              <Route
                path="/products"
                exact={true}
                component={ContentProductsInDB}
              />
              <Route path="/last-products" exact={true}>
                <LastsProductsInDB
                  key={this.state.products.id}
                  title={"Lo último de Coffee House"}
                  description={this.state.products.description}
                />
              </Route>
              <Route
                path="/table-products"
                exact={true}
                component={TableProductsList}
              />
              <Route
                path="/table-users"
                exact={true}
                component={TableUsersList}
              />
            </Switch>
          </div>
          {/* <!-- End of MainContent --> */}
          <Footer />
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </>
    );
  }
  async componentDidMount() {
    const products = await fetch("http://localhost:3002/api/products").catch(
      (error) => {
        console.log(error);
      }
    );
    const response = await products.json();

    this.setState({
      products: response.data.reduce((acc, value) => {
        return value;
      }),
    });
  }
}

export default ContentWrapper;
