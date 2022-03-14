import api from '@/modules/api';
import { Dish } from '@/types/data';
import Head from 'next/head';
import { useQuery } from 'react-query';

function Basket() {
  const dishesQuery = useQuery('GetDishes', () => api.get<Dish[]>('/dishes'), {
    select: ({ data }) => data,
  });
  
  return (
    <>
      <Head>
        <title>Restaurant App - Basket</title>
      </Head>
      <div className='container md:w-5/12 mx-auto py-10'>
        <h1 className='text-3xl'>Your Basket</h1>
        <table className='table-auto w-10/12 mt-3'>
            <tbody>
              <tr className='h-8 border-b-2 border-b-gray-300'>
                <td className='w-1/12'>2</td>
                <td className='w-9/12'>Burger XXL</td>
                <td className='text-right'>26,34€</td>
              </tr>
              <tr className='h-8 border-b-2 border-b-gray-300'>
                <td>2</td>
                <td>Burger XXL</td>
                <td className='text-right'>26,34€</td>
              </tr>
              <tr className='h-8 border-b-2 border-b-gray-300'>
                <td>2</td>
                <td>Burger XXL</td>
                <td className='text-right'>26,34€</td>
              </tr>
              <tr className='font-bold h-8'>
                <td colSpan={2} className='text-right'>Total</td>
                <td className='text-right'>26,34€</td>
              </tr>
            </tbody>
          </table>
      </div>
    </>
  );
}

export default Basket;
