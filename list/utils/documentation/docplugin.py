from apispec import BasePlugin
from apispec.yaml_utils import load_operations_from_docstring


class DocPlugin(BasePlugin):
    def init_spec(self, spec):
        super(DocPlugin, self).init_spec(spec)
        self.openapi_major_version = spec.openapi_version.major

    def operation_helper(self, operations, func, **kwargs):
        """Operation helper that parses docstrings for operations. Adds a
        ``func`` parameter to `apispec.APISpec.path`.
        """
        doc_operations = load_operations_from_docstring(func.__doc__)
        # Apply conditional processing
        if self.openapi_major_version < 3:
            "...Mutating doc_operations for OpenAPI v2..."
        else:
            "...Mutating doc_operations for OpenAPI v3+..."
        operations.update(doc_operations)
