import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import { navigationLinks } from '../../data/data';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.action';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [activeLinkIdx, setActiveLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);
  
  const handleLogout = () => {
    dispatch(logout()) 
  
  }


  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="user-info">
              <img src={ personsImgs.bugtech_systems } alt="profile image" width="auto" height="60px"/>
          <span className="info-name">Bugtech Systems</span>
      </div>

      <nav className="navigation">
          <ul className="nav-list">
            {
              navigationLinks.map((navigationLink) => (
                <li className="nav-item" key = { navigationLink.id }>
                  <div 
                  //  onClick={() => setActiveLinkIdx(navigationLink.id)}
                  className={ `nav-link ${ navigationLink.id === activeLinkIdx ? 'active' : null }` }>
                      <img src={ navigationLink.image } className="nav-link-icon" alt = { navigationLink.title } />
                      <span className="nav-link-text">{ navigationLink.title }</span>
                  </div>
                </li>
              ))
            }
                  <li className="nav-item">
                  <div onClick={() => handleLogout()} className={ `nav-link ${ (navigationLinks.length + 1) === activeLinkIdx ? 'active' : null }` }>
                      <LogoutIcon className="nav-link-icon"/>
                      <span className="nav-link-text">Logout</span>
                  </div>
                </li>
            
          </ul>
      </nav>
    </div>
  )
}

export default Sidebar
