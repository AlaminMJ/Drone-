import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./placeOrder.css";
import Navbar from "../../shared/navbar/Navbar";
import { useParams } from "react-router";
import axios from "axios";
const PlaceOrder = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios(`https://peaceful-sands-20601.herokuapp.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://peaceful-sands-20601.herokuapp.com/orders", {
        ...data,
        product,
      })
      .then((res) => {
        console.log(res.data);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { user } = useAuth();

  return (
    <div className="place-order">
      <Navbar />
      <div className="container">
        <h1 className="display-6 text-center text-primary">Place Order</h1>
        <div className="wrapper  py-5">
          <div className="left">
            <Card>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.title}</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="right">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Form.Group as={Col} md={12} lg={6} controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder="Enter Name"
                    {...register("name", {
                      value: user.email,
                      required: true,
                    })}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  md={12}
                  lg={6}
                  controlId="formGridPassword"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email"
                    {...register("email", {
                      value: user.email,
                      required: true,
                    })}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  placeholder="number"
                  {...register("number", { required: true })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Address </Form.Label>
                <Form.Control
                  placeholder="address"
                  {...register("address", { required: true })}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  {...register("quantity", { value: 1, required: true })}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="px-5">
                Order
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
