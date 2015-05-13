
#define ATOMIC_PLUGIN_MAIN
#include "AtomicPlugin.h"

extern "C"
{
    static int js_getAnswer(duk_context* ctx)
    {
        duk_push_number(ctx, 42);
        return 1;

    }

    // plugin init is a duk cfunction itself, so we can pcall the import	
    int PLUGIN_EXPORT_API atomic_plugin_init(duk_context* ctx)
    {
        // exports object at 0
        if (!duk_is_object(ctx, 0))
        {
            duk_push_boolean(ctx, 0);
            return 1;
        }

        // export out native functions
        duk_push_c_function(ctx, js_getAnswer, 0);
        duk_put_prop_string(ctx, -2, "getAnswer");

        // and return success
        duk_push_boolean(ctx, 1);
        return 1;
    }

}
