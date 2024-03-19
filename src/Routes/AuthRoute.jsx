import { Route, Routes } from "react-router-dom";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import { useQuery } from "react-query";
import { getPrincipalRequest } from "../apis/api/principal";
import RootSideMenuLeft from "../components/RootSideMenuLeft/RootSideMenuLeft";
import RootHeader from "../components/RootHeader/RootHeader";

// useQuery => GET 요청시에 사용
// 첫번째 매개변수 => 배열 ["key값", dependency]
// 두번째 매개변수 => 요청메소드(async, await)
/* 세번째 매개변수 => 옵션
    {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: 함수,
        onError: 함수,
        enabled: true or false
    }
    
*/
function AuthRoute(props) {
    
    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest, 
    {
        retry: 3,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log("onSuccess");
            console.log(response);
        },
        onError: error => {
            console.log("오류");
            console.log(error);
        }
    });

    return (
        <>
            <RootSideMenuLeft />
            <RootHeader />
            {
                principalQuery.isLoading ? <h1>로딩중...</h1> 
                : <Routes>
                    <Route path="/auth/*" element={ <AuthPage /> } />
                    <Route path="/" element={ <HomePage /> } />
                </Routes> 
            }
        </>
    );
}

export default AuthRoute;