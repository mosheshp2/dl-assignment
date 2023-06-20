import logo from '../assets/logo.svg';
import heart from '../assets/heart.svg';

interface NavBarProps {
    handleSearch: (value: string) => void, 
    wishlistOnly: boolean, 
    handleWishlistToggle: () => void
}
const NavBar: React.FC<NavBarProps> = ({handleSearch, wishlistOnly, handleWishlistToggle}) => {
   

    return (
        <nav>
        <div className='items'>
          <img src={logo} alt="Logo"/>
          <a onClick={handleWishlistToggle}>
            
            <img src={heart} alt="Wishlist" className={wishlistOnly ? '' : 'grayScale'}/>
            My Wish list
          </a>
        </div>
        <input
          type="text"
          placeholder="Looking for a book?"
          onChange={e => handleSearch(e.target.value)}
          className="search"
        />
        
      </nav>
    )
};
export default  NavBar;