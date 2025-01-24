import React, { useState } from "react"
import { Pencil, Trash, ArrowUp, ArrowDown } from "lucide-react"

export default function InventoryTable({
    inventory,
    editItem,
    confirmDelete,
    categories,
    filterCategory,
    setFilterCategory,
    sortOrder,
    setSortOrder,
}) {
    const [editingId, setEditingId] = useState(null)

    const startEditing = (id) => {
        setEditingId(id)
    }

    const handleEdit = (id, field, value) => {
        editItem(id, { [field]: field === "quantity" ? Number.parseInt(value) || 0 : value })
    }

    const stopEditing = () => {
        setEditingId(null)
    }

    const filteredInventory = inventory
        .filter((item) => filterCategory === "All" || item.category === filterCategory)
        .sort((a, b) => (sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity))

    return (
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-b dark:border-secondary-700">
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="p-2 border rounded bg-secondary-50 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                >
                    <option value="All">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
                    className="px-4 py-2 bg-secondary-100 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 rounded hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 flex items-center"
                >
                    {sortOrder === "asc" ? <ArrowUp className="h-5 w-5 mr-2" /> : <ArrowDown className="h-5 w-5 mr-2" />}
                    Sort by Quantity
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-secondary-50 dark:bg-secondary-700 transition-colors duration-300">
                            <th className="p-2 text-left text-secondary-900 dark:text-secondary-100">Name</th>
                            <th className="p-2 text-left text-secondary-900 dark:text-secondary-100">Category</th>
                            <th className="p-2 text-left text-secondary-900 dark:text-secondary-100">Quantity</th>
                            <th className="p-2 text-left text-secondary-900 dark:text-secondary-100">Description</th>
                            <th className="p-2 text-left text-secondary-900 dark:text-secondary-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-secondary-500 dark:text-secondary-400">
                                    No items found. Add some items to your inventory!
                                </td>
                            </tr>
                        ) : (
                            filteredInventory.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`border-b dark:border-secondary-700 ${item.quantity < 10 ? "bg-yellow-50 dark:bg-yellow-900" : ""
                                        } hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors duration-300`}
                                >
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <input
                                                type="text"
                                                value={item.name}
                                                onChange={(e) => handleEdit(item.id, "name", e.target.value)}
                                                onBlur={stopEditing}
                                                className="p-1 w-full bg-white dark:bg-secondary-600 border rounded text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            />
                                        ) : (
                                            <span
                                                onClick={() => startEditing(item.id)}
                                                className="cursor-pointer text-secondary-900 dark:text-secondary-100"
                                            >
                                                {item.name}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <select
                                                value={item.category}
                                                onChange={(e) => handleEdit(item.id, "category", e.target.value)}
                                                onBlur={stopEditing}
                                                className="p-1 w-full bg-white dark:bg-secondary-600 border rounded text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            >
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span
                                                onClick={() => startEditing(item.id)}
                                                className="cursor-pointer text-secondary-900 dark:text-secondary-100"
                                            >
                                                {item.category}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleEdit(item.id, "quantity", e.target.value)}
                                                onBlur={stopEditing}
                                                className="p-1 w-full bg-white dark:bg-secondary-600 border rounded text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                                min="0"
                                            />
                                        ) : (
                                            <span
                                                onClick={() => startEditing(item.id)}
                                                className="cursor-pointer text-secondary-900 dark:text-secondary-100"
                                            >
                                                {item.quantity}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editingId === item.id ? (
                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) => handleEdit(item.id, "description", e.target.value)}
                                                onBlur={stopEditing}
                                                className="p-1 w-full bg-white dark:bg-secondary-600 border rounded text-secondary-900 dark:text-secondary-100 transition-colors duration-300 focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                                            />
                                        ) : (
                                            <span
                                                onClick={() => startEditing(item.id)}
                                                className="cursor-pointer text-secondary-900 dark:text-secondary-100"
                                            >
                                                {item.description}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => startEditing(item.id)}
                                            className="p-1 text-primary-500 hover:text-primary-600 transition-colors duration-300 mr-2"
                                            aria-label="Edit item"
                                        >
                                            <Pencil className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => confirmDelete(item.id)}
                                            className="p-1 text-red-500 hover:text-red-600 transition-colors duration-300"
                                            aria-label="Delete item"
                                        >
                                            <Trash className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

