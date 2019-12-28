using Microsoft.MixedReality.WebRTC;
using System;
using System.Threading.Tasks;

namespace webRtcNetCore
{
    static class Program
    {
        static async Task Main(string[] args)
        {
            using var pc = new PeerConnection();
            var config = new PeerConnectionConfiguration();
            await pc.InitializeAsync(config);
            Console.WriteLine("Peer connection initialized");
        }
    }
}
