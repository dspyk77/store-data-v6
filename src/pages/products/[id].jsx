import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/components/spacer';

function Page() {
  const [product, setProduct] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const productData = await response.json();

        setProduct(productData);
      } else {
        console.error(response);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you sure ?');

    if (confirmation) {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/products');
      } else {
        console.error(response);
      }
    }
  };

  if (product == null) return;

  return (
    <>
      <h1>Product</h1>

      <Link variant="dark" className="me-auto" href="/products">Back</Link>

      <Spacer />

      <div>
        <Link href={`/products/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={() => handleDelete(product.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{product.category}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>{product.price}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{product.weight}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;
