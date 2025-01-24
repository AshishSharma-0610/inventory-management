import React from "react"
import { AlertTriangle } from "lucide-react"

export default function DeleteModal({ onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-lg transition-colors duration-300 max-w-sm w-full">
                <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">Confirm Deletion</h3>
                </div>
                <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-secondary-200 dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 rounded hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

