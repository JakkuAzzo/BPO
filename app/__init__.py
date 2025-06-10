# Application package initialisation
"""Expose the :func:`create_app` factory for external imports."""

# These modules are imported so that other parts of the application can use them
# when ``create_app`` is invoked.  They aren't executed on import which keeps the
# package lightweight.
from . import models  # noqa: F401  (re-exported for convenience)
from . import init_extensions  # noqa: F401

# Re-export the application factory used by ``flask run`` and tests
from .app import create_app

__all__ = ["create_app"]
