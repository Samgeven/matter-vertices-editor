import { Component, ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <>
        <h1>Oops, something went wrong.</h1>
        <p>Please, contact me via <a href="https://t.me/samgeven">telegram</a>, or create an issue in <a href="https://github.com/Samgeven/matter-vertices-editor">repository</a>
        </p>
        <p>Alternatively, you can reload page and try using the app again</p>
      </>
    }

    return this.props.children;
  }
}