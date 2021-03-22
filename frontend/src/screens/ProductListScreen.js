import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//components
import Message from "../components/Message";
import BunnyLoader from "../components/BunnyLoader";
import ConfirmationModal from "../components/ConfirmationModal";

//actions
import {
  listProducts,
  removeProductInventory,
  createProduct,
} from "../actions/productActions";

//constants ACTIONS
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productRemoveInventory = useSelector(
    (state) => state.productRemoveInventory
  );
  const {
    loading: loadingRemove,
    error: errorRemove,
    success: successRemove,
  } = productRemoveInventory;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit}`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successRemove,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    dispatch(removeProductInventory(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  //confirmation modal functionality
  const [show, setShow] = useState(false);
  const [modalItemId, setModalItemId] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setModalItemId(id);
    setShow(true);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1 className="mb-0">Products</h1>
        </Col>
        <Col className="text-right">
          <Button
            className="my-3"
            variant="secondary"
            onClick={createProductHandler}
          >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingRemove && <BunnyLoader />}
      {errorRemove && <Message variant="danger">{errorRemove}</Message>}
      {loadingCreate && <BunnyLoader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <BunnyLoader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm ">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Brand</th>
                <th>PICTURE</th>
                <th>SIZE</th>
                <th>NWT</th>
                <th>PRICE</th>
                <th>QTY</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="text-dark">
                  <td>
                    <Link to={`/products/${product._id}`}>{product._id}</Link>
                  </td>

                  <td>{product.name}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Image
                      style={{ height: "68px", width: "68px" }}
                      src={product.images[0]}
                      alt={product.name}
                      fluid
                      rounded
                    />
                  </td>
                  <td>{product.size}</td>
                  <td>{product.nwt && "NWT"}</td>
                  <td>${product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                      <Button block variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      block
                      disabled={product.countInStock < 1 && "disabled"}
                      className="btn-sm"
                      onClick={() => handleShow(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <ConfirmationModal
              show={show}
              onHide={handleClose}
              deleteHandler={deleteHandler}
              title="Deleting a Product"
              body="Are you sure you want to remove all of the inventory from this product?"
              cancelButton="Cancel"
              cancelButtonColor="primary"
              confirmButton="Remove Inventory"
              confirmButtonColor="secondary"
              id={modalItemId}
            />
          </Table>
          ;
        </>
      )}
    </>
  );
};

export default ProductListScreen;