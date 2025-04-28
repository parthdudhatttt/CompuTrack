import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-700 mt-4">{error.statusText || error.message}</p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400">
                Go Home
            </a>
        </div>
    );
};

export default ErrorBoundary;
