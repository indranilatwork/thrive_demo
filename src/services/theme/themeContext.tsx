import { useState, useContext, createContext } from "react"


export enum Themes {
    LIGHT= 'light',
    DARK='dark'
}


const ThemeContext = createContext<any>("dark");

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const storedTheme:string | null = localStorage.getItem('theme');
    const [theme, setTheme] = useState<string>(storedTheme? storedTheme : Themes.DARK);
/*

@param 
*/
    const toggleTheme = (giventheme?:Themes) => {
        if(!giventheme) {
            giventheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK;
        }
        setTheme(giventheme);
        localStorage.setItem('theme', giventheme);
    }



    return (<>{console.log("on change of provider", theme)}<ThemeContext.Provider value={{ theme, toggleTheme }}> {children} </ThemeContext.Provider></>)
}

export const useTheme = () => {
    return useContext(ThemeContext);
}