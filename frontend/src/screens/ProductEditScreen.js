import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

//components
import Message from "../components/Message";
import BunnyLoader from "../components/BunnyLoader";
import FormContainer from "../components/FormContainer";

//actions
import { listProductDetails } from "../actions/productActions";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [name, setName] = useState("");
  const [nwt, setNwt] = useState(false);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [description, setDescription] = useState("");
  const [sex, setSex] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [color, setColor] = useState("");
  const [subColor, setSubColor] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [images, setImages] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setNwt(product.nwt);
        setBrand(product.brand);
        setPrice(product.price);
        setSize(product.size);
        setDescription(product.description);
        setSex(product.sex);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setColor(product.color);
        setSubColor(product.subColor);
        setCountInStock(product.countInStock);
        setImages(product.images.join(", "));
      }
    }
  }, [dispatch, history, productId, product, loading]);

  //handle submit button
  const submitHandler = (e) => {
    e.preventDefault();
    //UPDATE PRODUCT
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-outline-secondary mb-3">
        Go Back to All Products
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <BunnyLoader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* name */}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* nNWTame */}
            <Form.Group controlId="nwt">
              <Form.Check
                type="checkbox"
                label="NWT?"
                checked={nwt}
                onChange={(e) => setNwt(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            {/* brand */}
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* price */}
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* size */}
            <Form.Group controlId="size">
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* description */}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* sex */}
            <Form.Group controlId="sex">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* category */}
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* subCategory */}
            <Form.Group controlId="subCategory">
              <Form.Label>sub Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sub Category"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* color */}
            <Form.Group controlId="color">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* subColor */}
            <Form.Group controlId="subColor">
              <Form.Label>Sub Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Sub Color"
                value={subColor}
                onChange={(e) => setSubColor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* countInStock */}
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* images */}
            <Form.Group controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control
                as="textarea"
                rows={16}
                placeholder="Enter Images"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* button */}
            <Button type="submit" variant="secondary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;