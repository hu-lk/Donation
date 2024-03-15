// Dashboard.jsx

import { useState } from "react";
import Navbar from "../../common/Navbar";
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { useNavigate } from "react-router-dom";

import style from "./Dashboard.module.css";
import image1 from "../../assets/images/donation.jpg";

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState("donate");
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    name: "",
    title: "",
    description: "",
    amount: "",
  });

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleInputChange = (e, fieldName) => {
    setRequestData({ ...requestData, [fieldName]: e.target.value });
  };

  const sidebarItems = [
    {
      label: "Donate",
      icon: "pi pi-money-bill",
      command: () => handleSectionChange("donate"),
    },
    {
      label: "Request",
      icon: "pi pi-comment",
      command: () => handleSectionChange("request"),
    },
  ];
  const donateCards = [
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: "0 / 120000",
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
    {
      id: 1,
      title: "Clean Water Project",
      description:
        "Providing clean water to rural communities Protecting the environment through sustainable practices Protecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practicesProtecting the environment through sustainable practices",
      imageUrl: image1,
      totalRaised: 12000,
    },
  ];

  const handleDonate = () => {
    navigate("/user/payment");
  };

  const renderDonateCards = () => {
    return donateCards.map((card) => (
      <div key={card.id} className={style.Card}>
        <Card>
          <div className={style.CardImageContainer}>
            <img
              src={card.imageUrl}
              alt={card.title}
              className={style.CardImage}
            />
          </div>

          <p className={`${style.CardDescription} p-card-subtitle`}>
            {card.description}
          </p>
          <div className={style.CardAmountContainer}>
            <div className={style.CardAmount}>
              Total Raised: ${card.totalRaised}
            </div>
            <div>
              <Button onclick={handleDonate}>Donate</Button>
            </div>
          </div>
        </Card>
      </div>
    ));
  };
  const handleRequestSubmit = () => {
    // Add your logic to handle the request submission
    console.log("Form submitted:", requestData);
    // Reset the form fields if needed
    setRequestData({
      name: "",
      title: "",
      description: "",
      amount: "",
    });
  };

  return (
    <>
      <Navbar />
      <div className={style.DashboardContainer}>
        <div className={style.LeftSection}>
          <Menu model={sidebarItems} />
        </div>
        <div className={style.RightSection}>
          {selectedSection === "donate" && (
            <div className={style.DonateCardsContainer}>
              {renderDonateCards()}
            </div>
          )}
          {selectedSection === "request" && (
            <Card className={style.CardContainer}>
              <div className={style.RequestFormContainer}>
                <h2>Request for Donation</h2>
                <form>
                  <div className={style.FormGroup}>
                    <label>Name:</label>
                    <InputText
                      className={style.FormInput}
                      value={requestData.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                  </div>
                  <div className={style.FormGroup}>
                    <label>Title:</label>
                    <InputText
                      className={style.FormInput}
                      value={requestData.title}
                      onChange={(e) => handleInputChange(e, "title")}
                    />
                  </div>
                  <div className={style.FormGroup}>
                    <label>Description:</label>
                    <InputText
                      className={style.FormInput}
                      value={requestData.description}
                      onChange={(e) => handleInputChange(e, "description")}
                    />
                  </div>
                  <div className={style.FormGroup}>
                    <label>Amount Required:</label>
                    <InputText
                      className={style.FormInput}
                      value={requestData.amount}
                      onChange={(e) => handleInputChange(e, "amount")}
                    />
                  </div>
                  <div className="card">
                    <label>Image:</label>
                    <FileUpload
                      name="demo[]"
                      url={"/api/upload"}
                      multiple
                      accept="image/*"
                      maxFileSize={1000000}
                      emptyTemplate={
                        <p className="m-0">
                          Drag and drop files to here to upload.
                        </p>
                      }
                    />
                  </div>
                  <Button
                    label="Submit Request"
                    className="p-mt-2"
                    onClick={handleRequestSubmit}
                  />
                </form>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
