//
//  BPWebView.m
//  Bunapi
//
//  Created by Yung-Luen Lan on 10/11/10.
//  Copyright 2010 HTC. All rights reserved.
//

#import "BPWebView.h"


@implementation BPWebView

- (id)initWithFrame: (NSRect)frameRect frameName: (NSString *)frameName groupName: (NSString *)groupName
{
	if (self = [super initWithFrame: frameRect frameName: frameName groupName: groupName]) {
		[self setDrawsBackground: NO];
	}
	return self;
}

- (NSView *) hitTest: (NSPoint)aPoint
{
	return self;
}

- (BOOL) isOpaque { return NO; }

- (BOOL) acceptsFirstResponder { return YES; }

- (void) mouseDown: (NSEvent *)event
{
	NSWindow *window = [self window];
	NSPoint originalMouseLocation = [window convertBaseToScreen:[event locationInWindow]];
	NSRect originalFrame = [window frame];
	
    while (YES) {
		//
		// Lock focus and take all the dragged and mouse up events until we
		// receive a mouse up.
		//
        NSEvent *newEvent = [window nextEventMatchingMask:(NSLeftMouseDraggedMask | NSLeftMouseUpMask)];
		
        if ([newEvent type] == NSLeftMouseUp)
		{
			break;
		}
		
		//
		// Work out how much the mouse has moved
		//
		NSPoint newMouseLocation = [window convertBaseToScreen:[newEvent locationInWindow]];
		NSPoint delta = NSMakePoint(newMouseLocation.x - originalMouseLocation.x, newMouseLocation.y - originalMouseLocation.y);
		
		NSRect newFrame = originalFrame;
		
		newFrame.origin.x += delta.x;
		newFrame.origin.y += delta.y;
		
		[window setFrame: newFrame display: YES animate: NO];
	}
}

@end
