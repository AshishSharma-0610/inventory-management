import React, { useState } from "react"
import { Plus } from "lucide-react"

export default function AddItemForm({ addItem, categories }) {
    const [newItem, setNewItem] = useState({ name: "", category: "", quantity: "", description: "" })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewItem((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newItem.name || !newItem.category || !newItem.quantity) return
        const quantity = Number.parseInt(newItem.quantity)
        if (isNaN(quantity) || quantity <= 0) return
        addItem({ ...newItem, quantity })
        setNewItem({ name: "", category: "", quantity: "", description: "" })
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-white dark:bg-secondary-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
        >
            <h2 className="text-2xl font-semibold mb-4 text-primary-600 dark:text-primary-400">Add New Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                    placeholder="Item Name"
                    className="p-2 border rounded bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    required
                />
                <select
                    name="category"
                    value={newItem.category}
                    onChange={handleInputChange}
                    className="p-2 border rounded bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    name="quantity"
                    value={newItem.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity"
                    className="p-2 border rounded bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    required
                    min="1"
                />
                <input
                    type="text"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                    placeholder="Description (optional)"
                    className="p-2 border rounded bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                />
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 flex items-center"
            >
                <Plus className="h-5 w-5 mr-2" />
                Add Item
            </button>
        </form>
    )
}

