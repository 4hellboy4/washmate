import { useRouter } from 'next/router';
import Item from '@/components/Home/Item/Item';

const ItemPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Item id={id as string} />;
};

export default ItemPage;
