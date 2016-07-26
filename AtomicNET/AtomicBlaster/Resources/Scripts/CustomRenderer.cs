
using AtomicEngine;

namespace AtomicBlaster
{
    static class CustomRenderer
    {
        static VertexBuffer vertexBuffer;

        public static void Initialize()
        {
            vertexBuffer = new VertexBuffer();
            vertexBuffer.Shadowed = true;
        }

    }
}