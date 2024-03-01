import { Sorter } from '@/components/Home/Table/Sorter/Sorter';
import { List } from '@/components/Home/Table/List/List';

export const Table = () => {
   return (
      <table className='table-container'>
         <Sorter />
         <List />
      </table>
   );
};
