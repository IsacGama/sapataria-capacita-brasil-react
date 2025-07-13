import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from '../Header/Header.module.css';


export default function CartIcon({ isMobile }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const iconClass = isMobile ? styles.mobileOnly : styles.desktopOnly;

  return (
    <Link to="/carrinho" className={`${styles.cartWrapper} ${iconClass}`}>
      <ShoppingCart className={styles.icon} />
      {totalQuantity > 0 && (
        <span className={styles.cartBadge}>{totalQuantity}</span>
      )}
    </Link>
  );
}
