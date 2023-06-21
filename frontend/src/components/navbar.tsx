import logo from '../assets/logo.svg';
import heart from '../assets/heart.svg';
import '../css/navbar.css';

interface NavBarProps {
  handleSearch: (value: string) => void;
  wishlistOnly: boolean;
  handleWishlistToggle: () => void;
}
const NavBar: React.FC<NavBarProps> = ({
  handleSearch,
  wishlistOnly,
  handleWishlistToggle,
}) => {
  const wishlistClick = (e: any) => {
    e.preventDefault();
    handleWishlistToggle();
  };
  return (
    <nav>
      <div className="items">
        <img src={logo} alt="Logo" />
        <a onClick={wishlistClick} href="./">
          <img
            src={heart}
            alt="Wishlist"
            className={wishlistOnly ? '' : 'grayScale'}
          />
          My Wish list
        </a>
      </div>
      <input
        type="text"
        placeholder="Looking for a book?"
        onChange={(e) => handleSearch(e.target.value)}
        className="search"
      />
    </nav>
  );
};
export default NavBar;
