import WithPrivateRoute from '../../components/WithPrivateRoute.js'
export default function FirstPost() {
  return <h1>this</h1>;
}

FirstPost.Auth = WithPrivateRoute