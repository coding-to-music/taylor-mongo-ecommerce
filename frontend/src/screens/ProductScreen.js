import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import ControlledCarousel from "../components/ControlledCarousel";
import Message from "../components/Message";

//action creators
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ match }) => {
  //dispatch will give us access to action creators
  const dispatch = useDispatch();

  //this gives us access to the state productDetails which has product, error, and loading bool, then deconstruct it
  const productDetails = useSelector((state) => state.productDetails);

  //deconstruct the whole state object
  const { loading, error, product } = productDetails;

  //use effect cannot be async. Define function that is async and then immediatly call it
  //useEffect takes a list of dependencies, it will fire off whenever any of those dependencies changes
  useEffect(() => {
    //dispatch the fetch product action creator
    //if the id in the url param is in state
    if (product && match.params.id !== product._id) {
      dispatch(listProductDetails(match.params.id));
    }
  }, [dispatch, product, match]);

  //add to cart button function
  const handleAddToCart = () => {
    console.log(`added ${product._id} to cart`);
  };

  return (
    <>
      {/* back button */}
      <Link to="/products" className="btn btn-outline-secondary mb-3">
        Go Back
      </Link>
      {/* check to see if the item is still loading, check for error, if not, render the product */}
      {loading ? null : error ? (
        <Message variant="danger">
          <h3>{error}</h3>
        </Message>
      ) : (
        <Row>
          {/* left col is picture, half of the row */}
          <Col md={12} lg={5}>
            {/* image carousel */}
            {loading === false && <ControlledCarousel product={product} />}
            {/* <Image src={images[0]} alt={name} fluid className="w-100" /> */}
          </Col>
          {/* middle col is descriptions, one third of the row */}
          <Col md={12} lg={4}>
            <ListGroup variant="flush" className="mb-3">
              {/* name (small description) */}
              <ListGroup.Item>
                <h4 className="mb-0" style={{ color: "#5a5a5a" }}>
                  {product.name}
                </h4>
              </ListGroup.Item>
              {/* brand and nwt */}
              <ListGroup.Item>
                <Container className="px-0 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 text-dark">{product.brand}</h5>
                  {product.nwt && (
                    <span className="badge badge-pill badge-primary">NWT</span>
                  )}
                </Container>
              </ListGroup.Item>
              {/* price and size */}
              <ListGroup.Item>
                <Container className="px-0 d-flex justify-content-between align-items-center">
                  <h3 className="mb-0 text-dark">${product.price}</h3>
                  <div className="d-flex align-items-center">
                    <small className="text-uppercase mr-1">size</small>
                    <h3 className="mb-0 d-flex align-items-center">
                      <span className="badge badge-pill badge-primary">
                        <strong>{product.size}</strong>
                      </span>
                    </h3>
                  </div>
                </Container>
              </ListGroup.Item>
              {/* description */}
              <ListGroup.Item>{product.description}</ListGroup.Item>
              {/* sex, category, subCategory */}
              <ListGroup.Item>
                <Container className="px-0 d-flex align-items-center">
                  <span className="badge badge-pill badge-primary mr-2">
                    {product.sex}
                  </span>
                  <span className="badge badge-pill badge-primary mr-2">
                    {product.category}
                  </span>
                  {product.subCategory && (
                    <span className="badge badge-pill badge-primary">
                      {product.subCategory}
                    </span>
                  )}
                </Container>
              </ListGroup.Item>
              {/* color and subColor */}
              <ListGroup.Item>
                <Container className="px-0 d-flex align-items-center">
                  <span className="badge badge-pill badge-primary mr-2">
                    {product.color}
                  </span>

                  {product.subColor && (
                    <span className="badge badge-pill badge-primary">
                      {product.subColor}
                    </span>
                  )}
                </Container>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          {/* third col is add to cart */}
          <Col md={12} lg={3}>
            <Card className="shadow">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Price:</strong>
                    </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Status:</strong>
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <span className="badge badge-primary">In Stock</span>
                      ) : (
                        <span className="badge badge-danger">Sold</span>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="secondary"
                    className="btn-block btn-lg"
                    onClick={handleAddToCart}
                    disabled={product.countInStock < 1}
                  >
                    {product.countInStock < 1 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
