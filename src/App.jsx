import { BrowserRouter, Routes, Route, createHashRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import VerifyAccount from './pages/VerifyAccount'
import { AuthProvider } from './context/AuthProvider'
import { ProjectsProvider } from './context/ProjectsProvider'
import PrivateAreaLayout from './layouts/PrivateAreaLayout'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import Project from './components/Project'
import EditProject from './pages/EditProject'
import NewCollaborator from './pages/NewCollaborator'

const router = createHashRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password/:token', element: <ResetPassword /> },
      { path: 'verify/:token', element: <VerifyAccount /> }
    ]
  },
  {
    path: '/projects',
    element: <PrivateAreaLayout />,
    children: [
      { index: true, element: <Projects /> },
      { path: 'new-project', element: <NewProject /> },
      { path: 'new-collaborator/:id', element: <NewCollaborator /> },
      { path: ':id', element: <Project /> },
      { path: 'edit/:id', element: <EditProject /> }
    ]
  }
])

function App () {
  return (
    <>
      <AuthProvider>
        <ProjectsProvider>
          <RouterProvider router={router}>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path='sign-up' element={<SignUp />} />
                  <Route path='forgot-password' element={<ForgotPassword />} />
                  <Route path='reset-password/:token' element={<ResetPassword />} />
                  <Route path='verify/:token' element={<VerifyAccount />} />
                </Route>
                <Route path='/projects' element={<PrivateAreaLayout />}>
                  <Route index element={<Projects />} />
                  <Route path='new-project' element={<NewProject />} />
                  <Route path='new-collaborator/:id' element={<NewCollaborator />} />
                  <Route path=':id' element={<Project />} />
                  <Route path='edit/:id' element={<EditProject />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </RouterProvider>
        </ProjectsProvider>
      </AuthProvider>
    </>
  )
}

export default App
