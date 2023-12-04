import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const productData = await response.json();

        setName(productData.name);
        setCategory(productData.category);
        setPrice(productData.price);
        setWeight(productData.weight);
      } else {
        console.error(response);
      }
    };

    fetchProduct();
  }, [id]);

  const sendUpdateProductRequest = async () => {
    const updatedProduct = {
      name: name,
      category: category,
      price: price,
      weight: weight
    };

    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
      const createdProduct = await response.json();
      console.log(`Updated product: ${JSON.stringify(createdProduct)}`);

      router.push(`/products/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="first-name">
        <Form.Label>Name</Form.Label>

        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="last-name" className="mt-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="price" className="mt-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="weight" className="mt-3">
        <Form.Label>Weight</Form.Label>
        <Form.Control
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateProductRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;
