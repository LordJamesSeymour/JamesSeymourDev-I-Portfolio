import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

interface ThreeErrorBoundaryProps {
  /** Rendered instead of the children if anything in the 3D subtree throws. */
  fallback: ReactNode;
  children: ReactNode;
}

interface ThreeErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render/runtime errors from the 3D subtree (WebGL context loss, a model
 * that fails to parse, etc.) so a single failure shows the polished fallback panel
 * instead of taking down the whole page.
 */
export default class ThreeErrorBoundary extends Component<
  ThreeErrorBoundaryProps,
  ThreeErrorBoundaryState
> {
  state: ThreeErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ThreeErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Dev-only breadcrumb; never throws further.
    if (import.meta.env.DEV) {
      console.warn("[ArcadeMachineReveal] 3D subtree error — showing fallback:", error, info);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
