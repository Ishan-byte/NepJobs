import React, {useState} from "react";

const Register = () => {

    let [countries] = useState([
        { id: 1, countryName: "India" },
        { id: 2, countryName: "UK" },
        { id: 3, countryName: "USA" },
        { id: 4, countryName: "Japan" },
        { id: 5, countryName: "France" },
        { id: 6, countryName: "Brazil" },
        { id: 7, countryName: "Mexico" },
        { id: 8, countryName: "Canada" },
      ]);

  return (
    <div className="row">
      <div className="col-lg-6 col-md-7 mx-auto ">
        <div className="card border-primary shadow-lg my-4">
          <div className="card-header border-bottom border-primary">
            <h4
              style={{ fontSize: "40px" }}
              className="text-center text-primary"
            >
              Nep Jobs
            </h4>
          </div>
          <div className="card-body border-bottom">
            {/* Email Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="email">
                Email
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                />
              </div>
            </div>
            {/* Email Ends */}
            {/* Password Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="password">
                Password
              </label>
              <div className="col-lg-8">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                />
              </div>
            </div>
            {/* Password Ends */}
            {/* FullName Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="fullName">
                Full Name
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                />
              </div>
            </div>
            {/* FullName Ends */}
            {/* Date of birth Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="form-control"
                />
              </div>
            </div>
            {/* Date of Birth Ends */}
            {/* Country Starts */}
            <div className="form-group form-row">
              <label className="col-lg-4" htmlFor="country">
                Country
              </label>
              <div className="col-lg-8">
                <select
                  id="country"
                  name="country"
                  className="form-control"
                >
                    {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.countryName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Country Ends */}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Register;