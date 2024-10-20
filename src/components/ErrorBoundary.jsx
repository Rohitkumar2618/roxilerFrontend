import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to trigger fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when error occurs
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    // Render children components if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
