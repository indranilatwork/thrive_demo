import './style/style.scss';
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home'
import { NavBar } from './shared/NavBar';
import { CountryDetails } from './pages/countryDetails/CountryDetails';
import { getData } from './services/api/axiosServices';
import { ThemeProvider } from './services/theme/themeContext';
import LoadingButton from '@mui/lab/LoadingButton';

// import { ThemeProvider } from './services/theme/themeContext';



function App() {


  const [data, setData] = useState<any>(null);
  const [theme, setTheme] = useState<any>({});


  useEffect(() => {
    getCountryData()
    getCssFromJson()
  }, []);

  useEffect(() => {
    themeToggle()
  }, [theme]);



  const getCssFromJson = async () => {
    try {
      let res = await getData(`${window.location.origin}/theme.json`);
      console.log("css json", res);

      setTheme(res.data);
    }
    catch (err) {
      console.log('JsonTheme error', err);

    }
  }

  const themeToggle = () => {
    let cssString = "";
    let head = document.head || document.getElementsByTagName('head')[0];
    let style: any = document.createElement('style');
    for (const [key, value] of Object.entries(theme)) {
      let cssValue: any = value;
      cssString += ` .${key} {`;
      for (const [key1, value1] of Object.entries(cssValue)) {
        cssString += `${key1}: ${value1};`;
      }
      cssString += `}`;
    }
    head.appendChild(style);
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = cssString;
    } else {
      style.appendChild(document.createTextNode(cssString));
    }

  }

  const getCountryData = async () => {
    try {
      const res = await getData('https://restcountries.com/v3.1/all');
      setData(res?.data)
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <ThemeProvider>
      <NavBar />
      {data ? (<Routes>
        <Route path='/' element={<Home data={data} />}></Route>
        <Route path='/country/:id' element={<CountryDetails data={data} />}></Route>
      </Routes>) :( <LoadingButton loading className="loading-style">
      </LoadingButton>)}
    </ThemeProvider>
  );
}

export default App;
