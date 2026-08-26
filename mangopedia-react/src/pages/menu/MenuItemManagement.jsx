import MenuItemTable from "../../components/menuitem/MenuItemTable";
import MenuItemModal from "../../components/menuitem/MenuItemModal";
import {
  useGetMenuItemsQuery,
  useCreateMenuItemMutation,
} from "../../store/api/menuItemsApi";
import { useState } from "react";

function MenuManagement() {
  const [showModal, setShowModal] = useState(false);
  const [createMenuItem] = useCreateMenuItemMutation();
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const {
    data: menuItems = [],
    isLoading,
    error,
    refetch,
  } = useGetMenuItemsQuery();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    specialTag: "",
    category: "",
    price: "",
    image: null,
  });

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      //call api to create
      const formDataToSend = new FormData();
      formDataToSend.append("Name", formData.name);
      formDataToSend.append("Category", formData.category);
      formDataToSend.append("Description", formData.description);
      formDataToSend.append("Price", formData.price);
      formDataToSend.append("SpecialTag", formData.specialTag);
      if (formData.image) {
        formDataToSend.append("File", formData.image);
      }
      let result;
      result = await createMenuItem(formDataToSend);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-4 mx-3">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2>Menu Item Management</h2>
              <p className="text-muted mb-0">
                Manage your restaurant's menu items
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Menu Item
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <MenuItemTable
                menuItems={menuItems}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <MenuItemModal
          formData={formData}
          onSubmit={handleFormSubmit}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}

export default MenuManagement;
