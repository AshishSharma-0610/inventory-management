import React, { useState, useEffect } from "react"
import Header from "./components/Header"
import InventoryTable from "./components/InventoryTable"
import AddItemForm from "./components/AddItemForm"
import DeleteModal from "./components/DeleteModal"
import { categories, initialInventory } from "./data"

export default function App() {
  const [inventory, setInventory] = useState([])
  const [filterCategory, setFilterCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedInventory = localStorage.getItem("inventory")
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory))
    } else {
      setInventory(initialInventory)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory))
  }, [inventory])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const addItem = (newItem) => {
    setInventory((prev) => [...prev, { ...newItem, id: Date.now() }])
  }

  const editItem = (id, updatedItem) => {
    setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)))
  }

  const deleteItem = () => {
    setInventory((prev) => prev.filter((item) => item.id !== itemToDelete))
    setShowDeleteModal(false)
  }

  const confirmDelete = (id) => {
    setItemToDelete(id)
    setShowDeleteModal(true)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode
          ? 'dark bg-secondary-900 bg-opacity-90 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z"%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\')]'
          : 'bg-secondary-50 bg-opacity-90 bg-[url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z"%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E\')]'
        }`}
    >
      <div className="container mx-auto p-4 max-w-5xl">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="space-y-8">
          <AddItemForm addItem={addItem} categories={categories} />
          {loading ? (
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-8 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-5/6 mb-4"></div>
              <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded w-3/4 mb-4"></div>
            </div>
          ) : (
            <InventoryTable
              inventory={inventory}
              editItem={editItem}
              confirmDelete={confirmDelete}
              categories={categories}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          )}
        </div>
        {showDeleteModal && <DeleteModal onCancel={() => setShowDeleteModal(false)} onConfirm={deleteItem} />}
      </div>
    </div>
  )
}

