
// ATOMIC_PLUGIN_MAIN must be defined in one (and only one) plugin source file
// before including AtomicPlugin.h
#define ATOMIC_PLUGIN_MAIN

#include "AtomicPlugin.h"

// define C linkage so that we can easily get functions from shared library 
extern "C"
{
    // a cfunction which returns the answer to life, the universe, and everything 
    static int js_getAnswer(duk_context* ctx)
    {
        duk_push_number(ctx, 42);
        return 1;
    }

    // a cfunction which checks that the answer is correct
    static int js_checkAnswer(duk_context* ctx)
    {
        int answer = duk_require_int(ctx, 0);

        answer == 42 ? duk_push_true(ctx) : duk_push_false(ctx);

        return 1;
    }

    // the function list that out native plugin exports
    static const duk_function_list_entry plugin_funcs[] = {
        { "getAnswer", js_getAnswer, 0 /*nargs*/ },
        { "checkAnswer", js_checkAnswer, 1 /*nargs*/ },
        { NULL, NULL, 0 }
    };

    // main plugin initialization function, which is a standard Duktape cfunction
    // must use PLUGIN_EXPORT_API for function to be exported from dll on Windows
    int PLUGIN_EXPORT_API atomic_plugin_init(duk_context* ctx)
    {
        // modules's exports object should be at index 0
        if (!duk_get_top(ctx) || !duk_is_object(ctx, 0))
        {
            // not an object, something went wrong
            duk_push_boolean(ctx, 0);
            return 1;
        }

        // export our native functions
        duk_put_function_list(ctx, 0, plugin_funcs);

        // and return success
        duk_push_boolean(ctx, 1);
        return 1;
    }

}
