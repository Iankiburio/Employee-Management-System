import React from 'react';
import '../css/home.css'
import AboutApp from './About'; // Import your component files
import DevelopersTeam from './Team';
import LoginSection from './LoginSection';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: 'login'
    };
  }

  handleNavClick = (section) => {
    this.setState({ activeSection: section }, () => {
      // Scroll to the top of the section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  render() {
    const { activeSection } = this.state;

    return (
      <div className="App">
        <div className='top'>
         <div className="logo2">
            AEMS
        </div>
        <nav className='homenavbar'>
          <ul>
            <li className={activeSection === 'about-app' ? 'active' : ''}>
              <button onClick={() => this.handleNavClick('about-app')}>
                About App
              </button>
            </li>
            <li className={activeSection === 'login' ? 'active' : ''}>
              <button onClick={() => this.handleNavClick('login')}>
                Admin and Employee Login
              </button>            
            <li className={activeSection === 'developers-team' ? 'active' : ''}>
              <button onClick={() => this.handleNavClick('developers-team')}>
                Developers Team
              </button>
            </li>

            </li>
          </ul>
        </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <AboutApp />
          <LoginSection />
          <DevelopersTeam />
        </div>
      </div>
    );
  }
}

export default Home;
